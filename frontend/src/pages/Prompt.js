import { useState } from "react";
import axios from 'axios';
import './Prompt.css';


function Prompt() {
    const [prompt, setPrompt] = useState("");
    const [message, setMessage] = useState("");

    async function sendPrompt(e) {
        e.preventDefault();

        const data = { prompt };

        try {
            const res = await axios.post('http://localhost:5000/generate', data);
            const response = res?.data?.message || "No response";
            setMessage(response);
        } catch (error) {
            console.error("Error from server:", error.message || error);
            setMessage("No response");
        }
    }

    return (
        <form onSubmit={sendPrompt}>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here"
            />
            <button type="submit">Generate</button>

            {message && <p>{message}</p>}
        </form>
    );
}

export default Prompt;
