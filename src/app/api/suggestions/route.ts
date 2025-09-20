import { NextRequest, NextResponse } from 'next/server';

interface SuggestionRequest {
  input: string;
}

interface TaskSuggestion {
  id: string;
  title: string;
  description: string;
}

// Dummy suggestion templates based on different keywords
const suggestionTemplates: Record<string, TaskSuggestion[]> = {
  programming: [
    {
      id: '1',
      title: 'Complete a coding tutorial',
      description: 'Follow a step-by-step programming tutorial to learn new concepts'
    },
    {
      id: '2',
      title: 'Practice coding problems',
      description: 'Solve algorithmic challenges on platforms like LeetCode or HackerRank'
    },
    {
      id: '3',
      title: 'Build a personal project',
      description: 'Create a small application to apply your programming skills'
    }
  ],
  learning: [
    {
      id: '1',
      title: 'Create a study schedule',
      description: 'Plan your learning sessions with specific goals and timelines'
    },
    {
      id: '2',
      title: 'Take notes and summarize',
      description: 'Write down key concepts and create summaries for better retention'
    },
    {
      id: '3',
      title: 'Practice with exercises',
      description: 'Apply what you learned through practical exercises and quizzes'
    }
  ],
  fitness: [
    {
      id: '1',
      title: 'Plan weekly workout routine',
      description: 'Create a balanced exercise schedule including cardio and strength training'
    },
    {
      id: '2',
      title: 'Track daily steps',
      description: 'Monitor your daily walking activity and aim for 10,000 steps'
    },
    {
      id: '3',
      title: 'Prepare healthy meals',
      description: 'Plan and prep nutritious meals to support your fitness goals'
    }
  ],
  work: [
    {
      id: '1',
      title: 'Prioritize daily tasks',
      description: 'List and rank your work tasks by importance and urgency'
    },
    {
      id: '2',
      title: 'Schedule focused work blocks',
      description: 'Allocate specific time periods for deep, concentrated work'
    },
    {
      id: '3',
      title: 'Review and plan ahead',
      description: 'Reflect on completed work and plan for upcoming projects'
    }
  ],
  default: [
    {
      id: '1',
      title: 'Break down into smaller steps',
      description: 'Divide your goal into manageable, actionable tasks'
    },
    {
      id: '2',
      title: 'Set a timeline',
      description: 'Create deadlines and milestones to track your progress'
    },
    {
      id: '3',
      title: 'Find resources and help',
      description: 'Identify tools, guides, or people that can assist you'
    }
  ]
};

function generateSuggestions(input: string): TaskSuggestion[] {
  const normalizedInput = input.toLowerCase();
  
  // Find matching keyword
  let selectedTemplate = suggestionTemplates.default;
  
  for (const [keyword, template] of Object.entries(suggestionTemplates)) {
    if (keyword !== 'default' && normalizedInput.includes(keyword)) {
      selectedTemplate = template;
      break;
    }
  }
  
  // Customize suggestions based on input
  return selectedTemplate.map((suggestion, index) => ({
    ...suggestion,
    id: `${Date.now()}-${index}`,
    title: suggestion.title.replace(/programming|learning|fitness|work/gi, input),
    description: suggestion.description.replace(/programming|learning|fitness|work/gi, input)
  }));
}

export async function POST(request: NextRequest) {
  try {
    const body: SuggestionRequest = await request.json();
    
    if (!body.input || typeof body.input !== 'string') {
      return NextResponse.json(
        { error: 'Input is required and must be a string' },
        { status: 400 }
      );
    }

    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    const suggestions = generateSuggestions(body.input.trim());
    
    return NextResponse.json({
      success: true,
      suggestions,
      input: body.input
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Task suggestions API endpoint',
    usage: 'POST with { input: string } to generate task suggestions'
  });
}