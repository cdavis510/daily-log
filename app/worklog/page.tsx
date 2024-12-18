'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Dancing_Script } from "next/font/google";
import Clock from '../components/Clock';

const dancingScript = Dancing_Script({ subsets: ["latin"] });

interface TodoItem {
  text: string;
  completed: boolean;
  timestamp: string;
}

interface WorkLogEntry {
  todos: TodoItem[];
  dependencies: string[];
  summary: string;
  date: string;
}

export default function WorkLogPage() {
  const [currentLog, setCurrentLog] = useState<WorkLogEntry>({
    todos: [],
    dependencies: [],
    summary: '',
    date: new Date().toLocaleDateString()
  });

  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setCurrentLog(prev => ({
      ...prev,
      todos: [
        ...prev.todos,
        {
          text: newTodo,
          completed: false,
          timestamp: new Date().toLocaleTimeString()
        }
      ]
    }));
    setNewTodo('');
  };

  const toggleTodo = (index: number) => {
    setCurrentLog(prev => ({
      ...prev,
      todos: prev.todos.map((todo, i) => 
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  };

  return (
    <div className="min-h-screen p-8 bg-[#ffe4cc]">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link 
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Start
          </Link>
          
          <h1 className={`${dancingScript.className} text-4xl font-bold text-center`}>
            Daily Family & Work Log
          </h1>
          
          <div className="text-right">
            <Clock />
            <div className="text-gray-600 mt-2">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
          {/* Todo List Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Tasks</h2>
            <form onSubmit={addTodo} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd4b3]"
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-[#ffd4b3] text-gray-800 rounded-lg hover:bg-[#ffcca3] transition-colors"
              >
                Add
              </button>
            </form>
            
            <div className="space-y-2 paper-lines pl-4">
              {currentLog.todos.map((todo, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 py-1"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(index)}
                    className="h-5 w-5 rounded border-gray-300 accent-[#ffd4b3]"
                  />
                  <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                    {todo.text}
                  </span>
                  <span className="text-sm text-gray-500 ml-auto">
                    {todo.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dependencies Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Dependencies</h2>
            <textarea
              value={currentLog.dependencies.join('\n')}
              onChange={(e) => setCurrentLog(prev => ({
                ...prev,
                dependencies: e.target.value.split('\n')
              }))}
              placeholder="List any dependencies or blockers..."
              className="w-full p-2 border rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#ffd4b3]"
            />
          </div>

          {/* Summary Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <textarea
              value={currentLog.summary}
              onChange={(e) => setCurrentLog(prev => ({
                ...prev,
                summary: e.target.value
              }))}
              placeholder="Write a summary of