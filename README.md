# AlgoGenesis-3D ✨

<div align="center">
  <img src="https://img.shields.io/badge/AlgoGenesis-3D-ff69b4?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="Project Title Badge"/>
  <br/>
  <a href="https://github.com/kh-bikash/algogenesis-3d/stargazers">
    <img src="https://img.shields.io/github/stars/kh-bikash/algogenesis-3d?style=social" alt="GitHub stars"/>
  </a>
  <a href="https://github.com/kh-bikash/algogenesis-3d/network/members">
    <img src="https://img.shields.io/github/forks/kh-bikash/algogenesis-3d?style=social" alt="GitHub forks"/>
  </a>
  <a href="https://github.com/kh-bikash/algogenesis-3d/issues">
    <img src="https://img.shields.io/github/issues/kh-bikash/algogenesis-3d?style=flat-square&color=A333C8" alt="GitHub issues"/>
  </a>
  <a href="https://github.com/kh-bikash/algogenesis-3d/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/kh-bikash/algogenesis-3d?style=flat-square&color=blue" alt="License"/>
  </a>
</div>

---

## 🚀 Ignite Your Algorithms: Real-time 3D Visualization & AI Explanations

AlgoGenesis-3D is a cutting-edge platform designed to **demystify complex algorithms** by transforming them into **interactive, visually stunning 3D animations**. Select problems from popular coding platforms, write your code, and watch every step of its execution unfold dynamically. Coupled with intelligent **AI explanations**, this is the ultimate tool for understanding, debugging, and mastering algorithms.

---

## 📸 Project Showcase

### Live Demo
![AlgoGenesis-3D Demo](demo.gif)
*Real-time visualization of a sorting algorithm in the 3D environment.*

### Screenshots
| Visualizer Launch | Real-time Execution | AI Explanation |
| :---: | :---: | :---: |
| ![Launching the 3D visualizer](df1.png) | ![Real-time execution](df3.png) | ![AI-powered explanation](df4.png) |

---

## 🌟 Core Features

- **Platform Integration**: Dynamically fetch algorithmic problems from **LeetCode**, **CodeChef**, and **Codeforces**.
- **Interactive 3D Visualization**: Watch data structures like arrays (and soon trees/graphs) come alive with **Three.js** & **React Three Fiber**.
- **Dynamic Error Highlighting**: Instantly spot logical errors and inefficiencies as they manifest visually in the 3D space.
- **Real-time Code Editor**: A built-in editor with syntax highlighting, auto-complete, and live feedback.
- **Step-by-Step Controls**: Precisely control the animation with Play, Pause, Step Forward/Backward, and Reset functions.
- **AI-Powered Explanations**: Leverage the **Groq API** to get concise explanations of your code, including time/space complexity analysis.
- **Futuristic UI/UX**: Immerse yourself in a sleek, neon-accented interface built with **Next.js** and **Tailwind CSS**.

---

## 🛠️ Tech Stack

| Area      | Technologies                                                                                                                                                                                                                                                                                       |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white) ![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-gray?style=for-the-badge) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)                                                                                   |
| **AI & APIs** | ![Groq](https://img.shields.io/badge/Groq-00C65E?style=for-the-badge) `axios` `vm2`                                                                                                                                                                                                           |

---

## ⚡ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
- **Node.js**: Version 18.x or higher ([Download here](https://nodejs.org/))
- **MongoDB**: A running instance, either locally or a cloud URI from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Groq API Key**: Obtain one from the [Groq Cloud Console](https://console.groq.com/keys)

### Installation Guide

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/kh-bikash/algogenesis-3d.git](https://github.com/kh-bikash/algogenesis-3d.git)
    cd algogenesis-3d
    ```

2.  **Configure Backend Environment**
    - Navigate to the backend directory:
      ```bash
      cd backend
      ```
    - Create a `.env` file and populate it with your keys:
      ```
      MONGO_URI=your_mongodb_connection_string
      GROQ_API_KEY=your_groq_api_key
      PORT=5000
      ```
    - Install backend dependencies:
      ```bash
      npm install
      ```

3.  **Configure Frontend Environment**
    - Navigate to the frontend directory from the project root:
      ```bash
      cd frontend
      ```
    - Install frontend dependencies:
      ```bash
      npm install
      ```

4.  **Run the Application**
    - **Start the Backend Server** (in one terminal, from the `backend` directory):
      ```bash
      npm run start
      ```
    - **Start the Frontend Server** (in a separate terminal, from the `frontend` directory):
      ```bash
      npm run dev
      ```

5.  **Access the App**
    Open your browser and navigate to `http://localhost:3000`.

---

## 💡 How to Use

1.  **Select a Platform**: Choose a coding platform (e.g., LeetCode).
2.  **Choose a Problem**: Click on a problem from the list to load it.
3.  **Write Code**: Use the editor to write your solution.
4.  **Visualize**: Click the `Run` button to see your algorithm animated in 3D.
5.  **Get Insights**: Click the `Explain with AI` button for a detailed analysis of your code.

---

## 🧠 What I Learned

This project was a fantastic journey through modern web technologies. Key learning outcomes include:
- Mastering 3D web graphics and animation with **Three.js** and **React Three Fiber**.
- Integrating third-party AI services (**Groq API**) into a full-stack application.
- Building a robust backend with **Node.js**, **Express**, and **MongoDB**.
- Creating a dynamic, responsive user interface with **Next.js** and **Tailwind CSS**.
- Developing an interactive platform to visualize complex algorithms from end to end.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. Please feel free to open an issue or submit a pull request.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
