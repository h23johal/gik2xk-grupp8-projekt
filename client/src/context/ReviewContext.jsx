// Skapar en kontext för att hantera recensioner i applikationen
import { createContext } from 'react';

// Skapar en ny kontext för recensioner
const ReviewContext = createContext();

// Exporterar kontexten för att kunna användas i andra komponenter
export default ReviewContext;