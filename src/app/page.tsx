import Input from "@/components/input";
import Todos from "@/components/todos";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-top mt-8 gap-5 min-h-screen">
      <h1 className="text-2xl font-bold">Todo App</h1>
      <Input />
      <Todos />
    </div>
  );
}
