import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrl: './my-requests.component.scss'
})
export class MyRequestsComponent {
  constructor(private authService: AuthService) { }
  items = [
    { name: 'John Doe', submissionDate: '2024-07-28', status: 'Pending' },
    { name: 'Jane Smith', submissionDate: '2024-07-27', status: 'Approved' },
    { name: 'Mike Johnson', submissionDate: '2024-07-26', status: 'Rejected' },
    { name: 'Emily Davis', submissionDate: '2024-07-25', status: 'Approved' },
    { name: 'Robert Brown', submissionDate: '2024-07-24', status: 'Pending' },
    { name: 'Linda Clark', submissionDate: '2024-07-23', status: 'Rejected' },
    { name: 'James Wilson', submissionDate: '2024-07-22', status: 'Pending' },
    { name: 'Patricia Martinez', submissionDate: '2024-07-21', status: 'Approved' },
    { name: 'William Taylor', submissionDate: '2024-07-20', status: 'Rejected' },
    { name: 'Jessica Anderson', submissionDate: '2024-07-19', status: 'Pending' },
    { name: 'Aessica Anderson', submissionDate: '2024-07-19', status: 'Pending' }
  ];

  sortColumn: string = 'name';
  sortDirection: boolean = true;

  sortTable(column: string) {
    this.sortDirection = (this.sortColumn === column) ? !this.sortDirection : true;
    this.sortColumn = column;
    this.filteredItems.sort((a, b) => {
      let comparison = 0;
      if (this.sortColumn === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (this.sortColumn === 'submissionDate') {
        comparison = new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
      } else if (this.sortColumn === 'status') {
        const statusOrder: { [key: string]: number } = { 'Approved': 1, 'Pending': 2, 'Rejected': 3 };
        comparison = (statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder]);
      }
      return this.sortDirection ? comparison : -comparison;
    });
  }

  getStatusCircleClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'circle-pending';
      case 'approved':
        return 'circle-approved';
      case 'rejected':
        return 'circle-rejected';
      default:
        return '';
    }
  }

  filteredItems = [...this.items];
  searchQuery: string = '';

  onSearch() {
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  fullName = ""
  matricule = ""
  position = ""
  ngOnInit() {
    // Check if token exists after component initialization
    const token = this.authService.getToken();
    if (token) {
      // Extract user data (consider using a secure backend API instead)
      const decodedPayload = atob(token.split('.')[1]);
      const userData = JSON.parse(decodedPayload);
      console.log(userData)
      this.fullName = userData.fullName
      this.matricule = userData.matricule
      this.position = userData.position


    }
  }
}
