function upload(event) {
    const file = event.target.files[0];

    if (file) {
        const filename = file.name;
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const contents = e.target.result;
            fetch("/api/upload", {
                method: "POST",
                body: JSON.stringify({ name: filename, content: contents.split(',')[1] }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Image uploaded successfully") {
                    const url = data.path;
                    document.getElementById("url").textContent = url;
                    document.getElementById("status").textContent = "Success";
                }
            })
            .catch((error) => {
                document.getElementById("status").textContent = "Failed";
            });
        }

        reader.readAsDataURL(file); 
    }
}


export default function upload_image() {
    return (
        <div className="info">
            <h1>Upload Image</h1>
            <p id="status"></p>
            <input type="file" id="file" name="file" accept="image/*" onChange={upload}/>
            <p id="url"></p>
        </div>
    );
}