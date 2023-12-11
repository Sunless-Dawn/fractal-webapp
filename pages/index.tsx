import DefaultLayout from "@/layouts/default";
import { Button, Slider, RadioGroup, Radio } from "@nextui-org/react";

export default function IndexPage() {
	return (
		<DefaultLayout>
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
		<RadioGroup
      label="Fractal Set"
      orientation="horizontal"
    >
      <Radio value="buenos-aires">Cantor</Radio>
      <Radio value="sydney">Pythagoras</Radio>
      <Radio value="san-francisco">Koch</Radio>
      <Radio value="london">H-Tree</Radio>
      <Radio value="tokyo">Sierpinski Carpet</Radio>
    </RadioGroup>
			<Button color="primary">Generate</Button>
		</DefaultLayout>
	);
}
