// Test script to check getAllProjects function
import { getAllProjects } from './src/lib/markdown.js';

async function testProjects() {
  try {
    const projects = await getAllProjects();
    console.log('Projects found:', projects.length);
    console.log('Projects:', projects.map(p => ({ id: p.id, title: p.title, slug: p.slug })));
  } catch (error) {
    console.error('Error:', error);
  }
}

testProjects();
