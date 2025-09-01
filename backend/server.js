// express from
const express = require("express");
const connectionDb=require("./DB/connection");
const User= require("./DB/schemas");
const cors = require("cors");

const app = express();


// Connect to MongoDB
connectionDb();

// Create a new user
const createUser = async () => {
  const existing = await User.findOne({ email: "curtissiahe18@gmail.com" });
  if (existing) {
    console.log('User already exists:', existing.email);
    return;
  }
  const user = new User({
    professionalName: "Curtis Siahe",
    base64Image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...",
    primaryDescription: "Software Developer passionate about building modern web applications.",
    workDescription1: "Experienced in JavaScript, Python, and full-stack development. Currently pursuing a Software Development degree.",
    workDescription2: "Open to internships and collaborative projects.",
    linkTitleText: "Check out my work and connect with me!",
    linkedInLink: { text: "LinkedIn", link: "https://www.linkedin.com/in/your-profile" },
    githubLink: { text: "GitHub", link: "https://github.com/your-profile" },
    nameLink: { firstName: "Curtis", url: "https://your-portfolio.com" },
    name: "Curtis Siahe",
    email: "curtissiahe18@gmail.com",
    age: 20
  });
  await user.save();
  console.log('User saved:', user);
};

createUser();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is working");
});

// Get the user
app.get("/professional", async (req, res) => {
  try {
    const professional = await User.findOne(); // fetch one from MongoDB
    if (!professional) {
      return res.status(404).json({ message: "No professional found" });
    }
    res.json(professional);
  } catch (error) {
    console.error("Error fetching professional:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

async function updateExistingUser() {
  await User.updateOne(
    { email: "curtis@example.com" }, // match your user's email
    {
      $set: {
        professionalName: "Curtis Siahe",
        base64Image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...",
        primaryDescription: "Software Developer passionate about building modern web applications.",
        workDescription1: "Experienced in JavaScript, Python, and full-stack development. Currently pursuing a Software Development degree.",
        workDescription2: "Open to internships and collaborative projects.",
        linkTitleText: "Check out my work and connect with me!",
        linkedInLink: { text: "LinkedIn", link: "https://www.linkedin.com/in/your-profile" },
        githubLink: { text: "GitHub", link: "https://github.com/your-profile" },
        nameLink: { firstName: "Curtis", url: "https://your-portfolio.com" }
      }
    }
  );
  console.log("User updated!");
}

updateExistingUser();

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
