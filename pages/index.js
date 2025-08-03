import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const imageStyles = [
    { value: '', label: 'Default' }, 
    { value: '3d-model', label: '3D Model' },
    { value: 'analog-film', label: 'Analog Film' },
    { value: 'anime', label: 'Anime' },
    { value: 'cinematic', label: 'Cinematic' },
    { value: 'comic-book', label: 'Comic Book' },
    { value: 'digital-art', label: 'Digital Art' },
    { value: 'enhance', label: 'Enhance' },
    { value: 'fantasy-art', label: 'Fantasy Art' },
    { value: 'glossy', label: 'Glossy' },
    { value: 'isometric', label: 'Isometric' },
    { value: 'line-art', label: 'Line Art' },
    { value: 'low-poly', label: 'Low Poly' },
    { value: 'modeling-compound', label: 'Modeling Compound' },
    { value: 'neon-punk', label: 'Neon Punk' },
    { value: 'origami', label: 'Origami' },
    { value: 'photographic', label: 'Photographic' },
    { value: 'pixel-art', label: 'Pixel Art' },
    { value: 'tile-texture', label: 'Tile Texture' },
    { value: 'watercolor', label: 'Watercolor' },
];

export default function Home() {

  const [prompt, setPrompt] = useState(''); 
    const [selectedStyle, setSelectedStyle] = useState(''); 
    const [result, setResult] = useState(''); 
    const [image, setImage] = useState(null); 
    const [loading, setLoading] = useState(false); 

    
    const handleGenerate = async () => {
        setLoading(true); 
        setResult(''); 
        setImage(null); 
        try {
            
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt + " in a paragraph." }),
            });

            const data = await res.json();
            const generatedText = data.result; 

            setResult(generatedText); 
            console.log('Sending prompt to image API:', generatedText);

            
            const cleanPrompt = typeof generatedText === 'string'
                ? generatedText.replace(/[#_*`>\-\[\]\(\)\n\r]/g, '').slice(0, 300)
                : '';
          
            const imageRes = await fetch('/api/image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: "Create a comic strip for the following text: " + cleanPrompt + " make sure that the text in the images are clear",
                    style_preset: selectedStyle, 
                }),
            });

            const imageData = await imageRes.json();
            console.log(' Image API response:', imageData);

            
            if (imageData.image) {
                setImage(`data:image/png;base64,${imageData.image}`); 
            } else {
                
                console.error('Image generation failed:', imageData.error || imageData);
                setResult(' Error generating image. Please try again.');
            }

        } catch (error) {
            
            console.error('Something went wrong during generation:', error);
            setResult(' Please try again......');
        } finally {
            setLoading(false); 
        }
    };

    return (
        
        <div style={styles.container}>
            <h1 style={styles.heading}>Comic & Meme Generator</h1>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                style={styles.textarea}
                placeholder="Describe your comic or meme idea here..."
            />

            <div style={styles.selectContainer}>
                <label htmlFor="imageStyle" style={styles.label}>Select Image Style:</label>
                <select
                    id="imageStyle"
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    style={styles.select}
                >

                    {imageStyles.map((style) => (
                        <option key={style.value} value={style.value}>
                            {style.label}
                        </option>
                    ))}
                </select>
            </div>


            <button
                onClick={handleGenerate}
                style={styles.button}
                disabled={loading || !prompt.trim()}
            >
                {loading ? 'Generating...' : 'Generate'}
            </button>

            {result && (
                <div style={styles.resultBox}>
                    <h3> Generated Text</h3>
                    <ReactMarkdown>{result}</ReactMarkdown>
                </div>
            )}


            {image && (
                <div style={styles.resultBox}>
                    <h3> Generated Image</h3>
                    <img
                        src={image}
                        alt="Generated"
                        style={styles.image}
                    />
                </div>
            )}
        </div>
    );
}


const styles = {
    container: {
        padding: 40,
        backgroundColor: '#1e1e1e', 
        minHeight: '100vh', 
        color: '#fff', 
        fontFamily: 'Georgia, serif', 
    },
    heading: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: '2.5rem', 
        color: '#a78bfa', 
    },
    textarea: {
        width: '100%',
        padding: 12,
        fontSize: '1rem',
        borderRadius: 8,
        border: '1px solid #555', 
        backgroundColor: '#2a2a2a',
        color: '#fff',
        marginBottom: 20,
        resize: 'vertical',
    },
    selectContainer: {
        marginBottom: 20,
    },
    label: {
        display: 'block',
        marginBottom: 8,
        fontSize: '1.1rem',
        color: '#ccc',
    },
    select: {
        width: '100%',
        padding: 10,
        fontSize: '1rem',
        borderRadius: 8,
        border: '1px solid #555',
        backgroundColor: '#2a2a2a',
        color: '#fff',
        appearance: 'none',
        
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23ccc' d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.7em top 50%',
        backgroundSize: '1.2em auto',
    },
    button: {
        padding: '12px 25px',
        fontSize: '1.1rem',
        backgroundColor: '#6d28d9', 
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        marginBottom: 30,
        width: '100%', 
        transition: 'background-color 0.3s ease, transform 0.3s ease',
    },
    
    buttonHover: {
        backgroundColor: '#5b21b6', 
        transform: 'scale(1.02)', 
    },
    resultBox: {
        backgroundColor: '#2a2a2a',
        padding: 20,
        borderRadius: 10,
        lineHeight: 1.6,
        marginBottom: 20,
        border: '1px solid #444', 
    },
    image: {
        width: '100%',
        height: 'auto',
        maxWidth: '100%',
        borderRadius: 8,
        objectFit: 'contain',
        display: 'block',
        border: '1px solid #444', 
    },
};

styles.button[':hover'] = styles.buttonHover;
