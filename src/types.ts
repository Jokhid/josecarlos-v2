export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  createdAt: any; // Firestore Timestamp
  status: 'new' | 'contacted' | 'archived';
}

export interface AppConfig {
  spreadsheetId: string;
  spreadsheetUrl: string;
  updatedAt: any; // Firestore Timestamp
}
