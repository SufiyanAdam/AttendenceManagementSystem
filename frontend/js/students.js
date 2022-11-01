window.onload = function () {
    //-------------------------------------------------------
    document.querySelector(".name-logo").addEventListener('mouseenter',()=>{
        document.querySelector(".option").style.height = "100%";
    })
    document.querySelector(".option").addEventListener('mouseleave',()=>{
        document.querySelector(".option").style.height = "0%";
    })
    document.querySelector(".you").addEventListener('mouseleave',()=>{
        document.querySelector(".option").style.height = "0%";
    })
    //-------------------------------------------------------
    // ----------------------------------------------
    const location = window.location.href.split("?");
    const course_id = location[location.length - 1];
    // ----------------------------------------------
    document.querySelector(".logo-name").addEventListener("click", (e) => {
        window.location.href =
            "./dashboard.html" + "?" + localStorage.getItem("token");
    });
    document.getElementById("add-student").addEventListener("click", (e) => {
        window.location.href =
            "../components/addstudent.html" + "?" + course_id;
    });
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            course_id: course_id,
        }),
    };
    function getStudentCard({name,id}) {
        return `
            <div class="student-card">
                <div class="s-name">
                    ${name}
                </div>
                <div class="s-rollno">
                    ${id}
                </div>
                <div class="s-rollno">
                    Attendence : 80%
                </div>
            </div>
        `;
    }
    fetch("http://localhost:5000/api/students", options)
        .then((response) => response.json())
        .then((response) => {
            let dom = "";
            // console.log(response);
            response.forEach(obj => {
                // console.log(element);
                dom+=getStudentCard(obj);
            });
            document.querySelector(".student-group").innerHTML = dom;
        })
        .catch((err) => console.error(err));
};
