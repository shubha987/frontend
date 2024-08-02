import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, Path } from 'fabric';
import axios from 'axios';

const Whiteboard = () => {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);

    const handleDrawEnd = useCallback(async (e) => {
        const path = e.path;
        try {
            const response = await axios.post('/api/polylines/', { data: JSON.stringify([path.path]) });
            const beautifiedCurves = response.data;
            canvas.remove(path);
            beautifiedCurves.forEach(curve => {
                const newPath = new Path(curve, {
                    stroke: '#000000',
                    strokeWidth: 5,
                    fill: null
                });
                canvas.add(newPath);
            });
            canvas.renderAll();
        } catch (error) {
            console.error('Error processing polyline:', error);
        }
    }, [canvas]);

    useEffect(() => {
        const fabricCanvas = new Canvas(canvasRef.current);
        setCanvas(fabricCanvas);

        fabricCanvas.isDrawingMode = true;
        fabricCanvas.freeDrawingBrush.width = 5;
        fabricCanvas.freeDrawingBrush.color = '#000000';

        fabricCanvas.on('path:created', handleDrawEnd);

        return () => {
            fabricCanvas.dispose();
        };
    }, [handleDrawEnd]);

    return (
        <div>
            <canvas ref={canvasRef} width={800} height={600} />
        </div>
    );
};

export default Whiteboard;