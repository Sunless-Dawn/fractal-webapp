import DefaultLayout from "@/layouts/default"
import { CANVAS, DEPTH_DEFAULT } from "@/config/constants"
import { Button, Slider, RadioGroup, Radio, SliderValue } from "@nextui-org/react"
import React, { useEffect, useRef, useState } from 'react'

export default function IndexPage() {
  const fractalCanvas = useRef<HTMLCanvasElement>(null);
  const [depth, setDepth] = useState<SliderValue>(DEPTH_DEFAULT)
  const [x, setX] = useState<SliderValue>(0)
  const [y, setY] = useState<SliderValue>(0)
  const [fractalSet, setFractalSet] = useState<string>('koch')

  useEffect(() => {
    const canvas = fractalCanvas.current
    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    function drawCantor(x: number, y: number, length: number, depth: SliderValue): void {
      if (!ctx) {
        return
      }
      if (depth === 0) {
        ctx.fillRect(x, y, length, 5);
      } else {
        const newLength = length / 3;
        drawCantor(x, y + 20, newLength, Number(depth) - 1);
        drawCantor(x + 2 * newLength, y + 20, newLength, Number(depth) - 1);
      }
    }

    function drawPythagorasTree(x: number, y: number, length: number, angle: number, depth: SliderValue): void {
      if (!ctx || depth === 0) {
        return
      }

      const x1 = x - (length / 2) * Math.cos(angle);
      const y1 = y - (length / 2) * Math.sin(angle);

      const x2 = x + (length / 2) * Math.cos(angle);
      const y2 = y + (length / 2) * Math.sin(angle);

      const x3 = x2 - (length * Math.sin(angle));
      const y3 = y2 + (length * Math.cos(angle));

      const x4 = x1 - (length * Math.sin(angle));
      const y4 = y1 + (length * Math.cos(angle));

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.lineTo(x4, y4);
      ctx.closePath();
      ctx.stroke();

      const newSize = length / Math.sqrt(2); // Calculate size for the next iteration

      drawPythagorasTree(x4, y4, newSize, angle - Math.PI / 4, Number(depth) - 1); // Left branch
      drawPythagorasTree(x3, y3, newSize, angle + Math.PI / 4, Number(depth) - 1); // Right branch
    }

    function drawKoch(x1: number, y1: number, x2: number, y2: number, depth: SliderValue) {
      if (!ctx) {
        return
      }
      if (depth === 0) {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      } else {
        const angle = Math.PI / 3 // 60 degrees in radians
        const deltaX = (x2 - x1) / 3
        const deltaY = (y2 - y1) / 3

        const xA = x1 + deltaX
        const yA = y1 + deltaY

        const xB = 0.5 * (x1 + x2) + Math.cos(angle) * deltaX - Math.sin(angle) * deltaY
        const yB = 0.5 * (y1 + y2) + Math.sin(angle) * deltaX + Math.cos(angle) * deltaY

        const xC = x1 + 2 * deltaX
        const yC = y1 + 2 * deltaY

        drawKoch(x1, y1, xA, yA, Number(depth) - 1)
        drawKoch(xA, yA, xB, yB, Number(depth) - 1)
        drawKoch(xB, yB, xC, yC, Number(depth) - 1)
        drawKoch(xC, yC, x2, y2, Number(depth) - 1)
      }
    }

    function drawHTree(x: number, y: number, length: number, depth: SliderValue): void {
      if (!ctx || depth === 0) {
        return
      }

      const halfLength = length / 2;
      const x0 = x - halfLength;
      const x1 = x + halfLength;
      const y0 = y - halfLength;
      const y1 = y + halfLength;

      ctx.beginPath();
      ctx.moveTo(x0, y);
      ctx.lineTo(x1, y);
      ctx.moveTo(x0, y0);
      ctx.lineTo(x0, y1);
      ctx.moveTo(x1, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();

      const newLength = length / Math.sqrt(2);

      drawHTree(x0, y0, newLength, Number(depth) - 1);
      drawHTree(x0, y1, newLength, Number(depth) - 1);
      drawHTree(x1, y0, newLength, Number(depth) - 1);
      drawHTree(x1, y1, newLength, Number(depth) - 1);
    }

    function drawSierpinski(x: number, y: number, length: number, depth: SliderValue): void {
      if (!ctx || depth === 0) {
        return
      }

      // triangle
      const height = Math.sqrt(3) * (length / 2);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + length, y);
      ctx.lineTo(x + length / 2, y - height);
      ctx.closePath();
      ctx.stroke();

      const newLength = length / 2;
      const newHeight = (Math.sqrt(3) * newLength) / 2;

      drawSierpinski(x, y, newLength, Number(depth) - 1);
      drawSierpinski(x + newLength, y, newLength, Number(depth) - 1);
      drawSierpinski(x + newLength / 2, y - newHeight, newLength, Number(depth) - 1);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height) // clear canvas
    ctx.strokeStyle = 'violet' // set color
    ctx.fillStyle = 'violet';
    const startX = Number(x) // x axis offset
    const startY = Number(y) // y axis offset

    switch (fractalSet) {
      case 'cantor':
        drawCantor(startX, startY, canvas.width - 20, depth)
        break;
      case 'pythagoras':
        drawPythagorasTree(canvas.width / 10, canvas.height / 2, canvas.height / 3, -Math.PI / 2, depth);
        break;
      case 'koch':
        drawKoch(startX, startY, canvas.width - 50, canvas.height - 50, depth)
        break;
      case 'htree':
        drawHTree(canvas.width / 2, canvas.height / 2, 200, depth);
        break;
      case 'sierpinski':
        drawSierpinski(startX, canvas.height - canvas.height / 10, canvas.width, depth);
        break;
      default:
        console.error('no fractal set')
    }
    

  }, [x, y, depth, fractalSet]);
	return (
		<DefaultLayout>
      <div className="grid grid-cols-2">
        <div>
        <Slider 
          label="X-axis" 
          step={1} 
          maxValue={CANVAS.width} 
          minValue={0} 
          defaultValue={0}
          className="max-w-md"
          onChange={setX}
        />
        <Slider 
          label="Y-axis" 
          step={1} 
          maxValue={CANVAS.height} 
          minValue={0} 
          defaultValue={0}
          className="max-w-md"
          onChange={setY}
        />
        <Slider 
          label="Depth" 
          step={1} 
          maxValue={7} 
          minValue={1} 
          defaultValue={DEPTH_DEFAULT}
          className="max-w-md"
          onChange={setDepth}
        />
        <RadioGroup
      label="Fractal Set"
      orientation="horizontal"
      defaultValue="koch"
      onValueChange={setFractalSet}
    >
      <Radio value="cantor">Cantor</Radio>
      <Radio value="pythagoras">Pythagoras</Radio>
      <Radio value="koch">Koch</Radio>
      <Radio value="htree">H-Tree</Radio>
      <Radio value="sierpinski">Sierpinski Carpet</Radio>
    </RadioGroup>
			<Button color="primary" onClick={() => alert([`not yet`, `stop!`, `keep on clickin'`][Math.floor(Math.random() * 3)])}>Generate</Button>
        </div>
        <div>
        <canvas ref={fractalCanvas} width={CANVAS.width} height={CANVAS.height} className="border-1 border-gray-700">

        </canvas>
        </div>
      </div>
		</DefaultLayout>
	);
}
