import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RequestService } from '../services/request.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrl: './my-requests.component.scss'
})
export class MyRequestsComponent {
  constructor(private authService: AuthService, private requestService: RequestService, private datePipe: DatePipe ) { }

  sortColumn: string = 'vmName';
  sortDirection: boolean = true;

  sortTable(column: string) {
    this.sortDirection = (this.sortColumn === column) ? !this.sortDirection : true;
    this.sortColumn = column;
    this.filteredItems.sort((a, b) => {
      let comparison = 0;
      if (this.sortColumn === 'vmName') {
        comparison = a.vmName.localeCompare(b.vmName);
      } else if (this.sortColumn === 'desired_start_date') {
        comparison = new Date(b.desired_start_date).getTime() - new Date(a.desired_start_date).getTime();
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

    items: any[] = [];
    filteredItems = [...this.items];



  onSearch() {
    this.filteredItems = this.items.filter(item =>
      item.vmName.toLowerCase().includes(this.searchQuery.toLowerCase())
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
      this.fullName = userData.fullvmName
      this.matricule = userData.matricule
      this.position = userData.position
      // Fetch requests by user ID
      this.fetchRequestsByUserId(userData.id);


    }
  }

  fetchRequestsByUserId(userId: string) {
    this.requestService.getRequestsByUserId(userId).subscribe(
      (data) => {
        this.items = data;
        this.filteredItems = [...this.items];
        console.log('Requests fetched successfully:', data);
      },
      (error) => {
        console.error('Error fetching requests:', error);
      }
    );
  }

  formatDate(date: string) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  searchQuery: string = '';
}
