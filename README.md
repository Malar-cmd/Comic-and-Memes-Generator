**AI Comic and Memes Generator**

The primary aim of this project is to develop and launch an innovative AI-powered web application that revolutionizes how users create engaging and shareable visual content, specifically focusing on memes and comic-style stories.

**WorkFlow**

[User Input]-> Gets the base prompt and image style from the user.

[Text Generation]->With the base prompt use the prompt to generate a detailed prompt

[Image Generation]->Use this generated detailed prompt and the image style to generate the image.

[Display the generated text and image]-> Lastly the generated text and image is displayed. 

**Implementation**

The core functionality will rely on integrating generative AI models for image creation (Stable Diffusion) and large language models for text and dialogue generation (Misteral AI), ensuring the output aligns with the user's humorous, trending, or personal themes. The application will display the generated visual and textual content.


Here’s the **Local Setup** section rewritten as **clear step-by-step points** for your README:

---

##  Local Setup

1. **Install prerequisites**
   Make sure you have:

   * [Node.js v16+](https://nodejs.org/en/download/)
   * npm (comes with Node.js)

2. **Clone the repository**

   ```bash
   git clone https://github.com/Malar-cmd/Comic-and-Memes-Generator
   cd Comic-and-Memes-Generator
   ```

3. **Set up environment variables**
   Create a `.env` file in the root (or backend folder) and add:

   ```
   MISTRAL_API_KEY=your_mistral_api_key_here
   IMAGE_API_KEY=your_image_api_key_here
   ```

4. **Install dependencies**

   * **Backend**

     ```bash
     cd backend
     npm install
     ```
   * **Frontend**

     ```bash
     cd frontend
     npm install
     ```

5. **Start the backend**

   ```bash
   npm run dev
   ```

   Runs the backend server on `http://localhost:5000` (default).

6. **Start the frontend**

   ```bash
   npm start
   ```

   Runs the React app on `http://localhost:3000`.

7. **Open the app**
   Visit `http://localhost:3000` in your browser, enter your prompt, choose a style, and generate your comic/meme.

---

If you want, I can now **merge this step list** into the README I made earlier so you have a **complete and clean final file**.
