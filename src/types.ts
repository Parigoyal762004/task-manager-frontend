export interface Task {
    id?: number; // Make id optional
    title: string;
    status: string;
    createdAt?: string; // Add other fields as needed
    description: string;
    dueDate: string;
    assignedTo: string;
  }
  