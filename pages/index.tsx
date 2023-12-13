import DefaultLayout from "@/layouts/default";
import { Button, Slider, RadioGroup, Radio, SliderValue } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from 'react';

const DEPTH_DEFAULT = 4

export default function IndexPage() {
  const fractalCanvas = useRef<HTMLCanvasElement>(null);
  const [depth, setDepth] = useState<SliderValue>(DEPTH_DEFAULT)

  useEffect(() => {
    const canvas = fractalCanvas.current
    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    // Function to draw the Koch Curve
    function drawKoch(x1: number, y1: number, x2: number, y2: number, depth: SliderValue) {
      if (!ctx) {
        return
      }
      if (depth === 0) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      } else {
        const angle = Math.PI / 3; // 60 degrees in radians
        const deltaX = (x2 - x1) / 3;
        const deltaY = (y2 - y1) / 3;

        const xA = x1 + deltaX;
        const yA = y1 + deltaY;

        const xB = 0.5 * (x1 + x2) + Math.cos(angle) * deltaX - Math.sin(angle) * deltaY;
        const yB = 0.5 * (y1 + y2) + Math.sin(angle) * deltaX + Math.cos(angle) * deltaY;

        const xC = x1 + 2 * deltaX;
        const yC = y1 + 2 * deltaY;

        drawKoch(x1, y1, xA, yA, Number(depth) - 1);
        drawKoch(xA, yA, xB, yB, Number(depth) - 1);
        drawKoch(xB, yB, xC, yC, Number(depth) - 1);
        drawKoch(xC, yC, x2, y2, Number(depth) - 1);
      }
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set initial parameters and draw the Koch Curve
    ctx.strokeStyle = 'black';
    const startX = 50;
    const startY = 150;
    const endX = canvas.width - 50;
    const endY = 150;
    drawKoch(startX, startY, endX, endY, depth); // Adjust the depth to control the complexity of the fractal

  }, [depth]);
	return (
		<DefaultLayout>
      <div className="grid grid-cols-2">
        <div>
        <Slider 
          label="X-axis" 
          step={1} 
          maxValue={600} 
          minValue={0} 
          defaultValue={300}
          className="max-w-md"
        />
        <Slider 
          label="Y-axis" 
          step={1} 
          maxValue={600} 
          minValue={0} 
          defaultValue={300}
          className="max-w-md"
        />
        <Slider 
          label="Depth" 
          step={1} 
          maxValue={10} 
          minValue={0} 
          defaultValue={DEPTH_DEFAULT}
          className="max-w-md"
          onChange={setDepth}
        />
        <RadioGroup
      label="Fractal Set"
      orientation="horizontal"
    >
      <Radio value="cantor">Cantor</Radio>
      <Radio value="pythagoras">Pythagoras</Radio>
      <Radio value="koch">Koch</Radio>
      <Radio value="htree">H-Tree</Radio>
      <Radio value="sierpinski">Sierpinski Carpet</Radio>
    </RadioGroup>
			<Button color="primary">Generate</Button>
        </div>
        <div>
        <canvas ref={fractalCanvas} width={500} height={300} className="border-1 border-gray-700">

        </canvas>
        </div>
      </div>
		</DefaultLayout>
	);
}
