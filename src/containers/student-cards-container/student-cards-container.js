import React, { useState, useEffect, useRef } from "react";
import API from "../../service/api";
import StudentCard from "../../components/student-card/student-card";
import SearchInput from "../../components/search-input/search-input";
import styles from "./student-cards-container.module.css";

function StudentCardsContainer() {
    const cache = useRef({});
    const [students, setStudents] = useState([]);
    const [nameSearchInput, setNameSearchInput] = useState("");
    const [tagSearchInput, setTagSearchInput] = useState("");

    useEffect(() => {
        parallelAPIrequests();
    }, []);

    function initializeTags(students) {
        const res = [];
        students.forEach((student) => {
            if (!student.tags) {
                Object.assign(student, { tags: [] });
            }
            res.push(student);
        });
        return res;
    }

    async function getStudents() {
        // Later, this if statement can be changed based on business requirements
        if (students.length > 0) {
            return;
        }
        try {
            let data;
            if (cache.current["studentsAPI"]) {
                data = cache.current["studentsAPI"];
            } else {
                data = await API.fetchStudents();
                cache.current["studentsAPI"] = data;
            }
            const studentsWithTags = initializeTags(data.students);
            setStudents((prev) => [...prev, ...studentsWithTags]);
        } catch (err) {
            return;
        }
    }

    async function parallelAPIrequests() {
        try {
            const fetchFunctions = [getStudents()];
            await Promise.all(fetchFunctions);
        } catch (err) {
            return;
        }
    }

    // Prevent from adding duplicates tag
    function addTag(newTag, student) {
        const index = students.findIndex((stu) => stu.id === student.id);
        let isUnique = true;
        students[index].tags.forEach((tag) => {
            if (tag.toLowerCase() === newTag.toLowerCase()) {
                isUnique = false;
            }
        });
        if (isUnique) {
            const res = [...students];
            res[index].tags.push(newTag);
            setStudents(res);
        } else {
            alert("Tag name must be unique");
        }
    }

    function removeTag(selectedTag, student) {
        const res = [...students];
        res.map((stu) => {
            if (stu.id === student.id) {
                const filteredTags = stu.tags.filter(
                    (tag) => tag.toLowerCase() !== selectedTag.toLowerCase()
                );
                stu.tags = filteredTags;
                return;
            }
        });
        setStudents(res);
    }

    // Filter students based on name search input
    function filterByName(arr) {
        let fullName;
        return arr.filter((student) => {
            fullName = (student.firstName + student.lastName)
                .toLowerCase()
                .trim();
            return fullName.includes(nameSearchInput);
        });
    }

    // Filter students based on tag search input
    function filterByTag(arr) {
        return arr.filter((student) => {
            let isTagged = false;
            let lowerCasedTag;
            student.tags.forEach((tag) => {
                lowerCasedTag = tag.toLowerCase().trim();
                if (lowerCasedTag.includes(tagSearchInput)) {
                    isTagged = true;
                }
            });
            return isTagged;
        });
    }

    // Sort Students array by most relevant to the name search term
    function sortByNameSearchInput(arr) {
        let Afullname, Bfullname, Aidx, Bidx;
        // If name search input is longer then 0 start sort based on search term
        if (nameSearchInput) {
            arr.sort((a, b) => {
                Afullname = (a.firstName + a.lastName).toLowerCase();
                Bfullname = (b.firstName + b.lastName).toLowerCase();
                Aidx = Afullname.indexOf(nameSearchInput);
                Bidx = Bfullname.indexOf(nameSearchInput);
                // Sort based on the index of search input in the full name
                if (Aidx < Bidx) {
                    return -1;
                } else if (Aidx > Bidx) {
                    return 1;
                } else {
                    /* If first index of search input is same then iterate shorter length of name
                    and find where "i" location of character from A & B fullname is different
                    Then compare two character to sort */
                    const len = Math.min(Afullname.length, Bfullname.length);
                    for (let i = 0; i < len; i++) {
                        if (Afullname[i] !== Bfullname[i]) {
                            return Afullname[i].localeCompare(Bfullname[i]);
                        }
                    }
                    return 0;
                }
            });
            cache.current[nameSearchInput] = arr;
        } else {
            // If there are no name search input received, then sort by fullname
            arr.sort((a, b) => {
                Afullname = a.firstName + a.lastName;
                Bfullname = b.firstName + b.lastName;
                return Afullname > Bfullname ? 1 : -1;
            });
        }
    }

    function renderStudentCards() {
        if (students.length) {
            let res;
            if(nameSearchInput.length && cache.current[nameSearchInput]){
                res = cache.current[nameSearchInput];
            } else {
                res = [...students];
                if (nameSearchInput.length) {
                    res = filterByName(res);
                }
                if (tagSearchInput.length) {
                    res = filterByTag(res);
                }
                sortByNameSearchInput(res);
            }
            // Render students based on the results of array
            return res.map((student) => {
                return (
                    <StudentCard
                        key={student.id + Math.random()}
                        student={student}
                        addTag={addTag}
                        removeTag={removeTag}
                    />
                );
            });
        }
    }

    return (
        <React.Fragment>
            <div className={styles.studetCardContainerWrapper}>
                <div className={styles.contentContainer}>
                    <SearchInput
                        type={"name"}
                        inputFunction={setNameSearchInput}
                    />
                    <SearchInput
                        type={"tag"}
                        inputFunction={setTagSearchInput}
                    />
                    {renderStudentCards()}
                </div>
            </div>
        </React.Fragment>
    );
}
export default StudentCardsContainer;
