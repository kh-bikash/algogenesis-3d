# AlgoGenesis-3D ✨: Visualize Your Code in a New Dimension

## Ignite Your Algorithms: Real-time 3D Visualization & AI Explanations

AlgoGenesis-3D is a groundbreaking platform designed to demystify complex algorithms by transforming them into interactive, visually stunning 3D animations. Select problems from popular coding platforms, write your code, and watch every step of its execution unfold in a dynamic 3D environment. Coupled with intelligent AI explanations, this is the ultimate tool for understanding, debugging, and mastering algorithms.

---

## 📸 Project Showcase

Get a glimpse of AlgoGenesis-3D in action!

*(**Note**: Replace the placeholder below with an actual GIF or screenshot of your running application. You can drag and drop an image directly into your GitHub README editor, or upload it to an image hosting service and link it here.)*

![AlgoGenesis-3D Demo Screenshot](https://via.placeholder.com/800x450?text=Your+Project+Screenshot+Goes+Here)
*Example: An array being sorted in real-time within the 3D visualizer.*

---

## 🌟 Features

* **Platform Integration**: Seamlessly fetch algorithmic problems from leading coding platforms like **LeetCode**, **CodeChef**, and **Codeforces**.
* **Interactive 3D Visualization**: Witness data structures (arrays, soon trees, graphs!) and algorithm logic come alive with smooth 3D animations powered by Three.js and React Three Fiber.
* **Dynamic Error Highlighting**: Instantly spot logical errors or inefficiencies as they manifest visually in the 3D space.
* **Real-time Code Editor**: Write and modify your code in an integrated editor with syntax highlighting and auto-complete.
* **Step-by-Step Controls**: Navigate through algorithm execution with precision using Play, Pause, Step Forward, Step Backward, and Reset controls.
* **AI-Powered Explanations**: Leverage the **Groq API** to get concise, high-level explanations of your code, including time/space complexity analysis, and potential issues.
* **Futuristic UI/UX**: Immerse yourself in a sleek, neon-accented interface built with Next.js and Tailwind CSS.

---

## 🛠️ Tech Stack

AlgoGenesis-3D is built with a robust and modern stack, designed for performance and a captivating user experience.

### Frontend
* **Framework**: ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) (React)
* **Styling**: ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
* **3D Graphics**: ![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white) / ![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-gray?style=for-the-badge)
* **Animation**: `framer-motion-3d`
* **Code Editor**: `react-simple-code-editor`

### Backend
* **Runtime**: ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
* **Framework**: ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
* **Database**: ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) (with Mongoose)
* **Code Sandboxing**: `vm2`

### AI & APIs
* **AI Explanations**: ![Groq](https://img.shields.io/badge/Groq-00C65E?style=for-the-badge&logo=groq&logoColor=white) API
* **Problem Fetching**: `axios` (for mock/future API integrations)

---

## 🚀 Getting Started

Follow these steps to set up and run AlgoGenesis-3D on your local machine.

### Prerequisites

* **Node.js**: v18.x or higher (includes npm)
* **MongoDB**: A running instance (local or cloud-based like MongoDB Atlas)
* **Groq API Key**: Obtain one from [Groq Cloud](https://console.groq.com/keys)

### 1. Clone the Repository

```bash
git clone [https://github.com/kh-bikash/algogenesis-3d.git](https://github.com/kh-bikash/algogenesis-3d.git)
cd algogenesis-3d
