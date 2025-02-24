# Markdown Editor  

A feature-rich Markdown Editor built with **ReactJS**, **TailwindCSS** and **NodeJS**  designed to simplify writing, editing, and managing Markdown files.  

## ✨ Features  
- **Import and Export Markdown Files:** Easily upload `.md` files or export your work in Markdown format.  
- **Save with Custom Filenames:** Save your Markdown files with personalized names for better organization.  
- **Real-Time Editor with Preview:**  
  - Preview your Markdown in real-time while editing.  
  - Toggle between **Preview Mode** (rendered Markdown) and **Raw Mode** (Markdown source code).
  - Use the **Editor Using Socket** button for using markdown with **Socket** (NodeJS is involved)   
- **Word, Line, and Character Counter:** Keep track of your content with dynamic counters that update as you type.  
- **Copy Markdown Content:** Quickly copy the raw Markdown code to your clipboard with a single click.  
- **Responsive and Minimal UI:** Built with TailwindCSS for a clean, user-friendly interface.  
- **Sidebar with Predefined Sections:**  
  - Browse a list of predefined sections and search for specific ones. Click on any section to load its default Markdown content.  
- **Custom Section Creation:** Easily create your own custom sections with a simple click of the "Custom Section" button.  
- **Reorder Sections:** You can now reorder your selected sections by dragging and dropping them in the editor.  
- **Improved Table Preview:** Enhanced table rendering in the preview to ensure proper display.  

## 🛠️ Built With  
- **ReactJS:** For building the interactive and dynamic user interface.  
- **TailwindCSS:** For crafting a responsive and modern design.  
- **NodeJs:** For Socket Connection to convert markdown in real-time.
## 📦 Getting Started  

### Prerequisites  
- Node.js and npm(node package manager) installed on your system.  

### Installation  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/Usman972002/markdown_editor_neo.git  
   ```  
2. Navigate to the project directory:  
   ```bash  
   cd frontend  
   cd backend  
   ```  
3. Install dependencies:  
   ```bash  
   npm install 
   ```  
4. Start the development server:  
   ```bash  
   frontend : npm run dev 
   backend  : npm start
   ```  
5. Open your browser and go to http://localhost:5173 to view the application.  

## 🖥️ Usage  
1. Open the editor in your browser.  
2. Import a `.md` file or start typing directly in the editor.  
3. Use the **Preview** button to view the rendered content or the **Raw** button to see the Markdown source code.  
4. Export your work or copy the Markdown content as needed.  
5. Use the sidebar to search for predefined sections and add them to your document.  
6. Create custom sections and reorder them as per your requirements.
7. Use **Editor Using Socket** button to view the rendered content using Socket in real-time.  

## 🆓 License  
This project is free to use and does not include any license.  

Happy writing with Markdown! 😊
