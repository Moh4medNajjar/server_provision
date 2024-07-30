import { Component } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  items = [
    { name: 'Mohamed Ben Ali', position: 'Developer', matricule: 'DEV001' },
    { name: 'Fatma Bouazizi', position: 'Manager', matricule: 'MAN002' },
    { name: 'Ahmed Khelifi', position: 'Analyst', matricule: 'ANA003' },
    { name: 'Houssem Karray', position: 'Designer', matricule: 'DES004' },
    { name: 'Salma Gharbi', position: 'Tester', matricule: 'TES005' },
    { name: 'Nizar Trabelsi', position: 'Developer', matricule: 'DEV006' },
    { name: 'Amira Chebbi', position: 'Manager', matricule: 'MAN007' },
    { name: 'Fares Mbarek', position: 'Analyst', matricule: 'ANA008' },
    { name: 'Rania Dhouib', position: 'Designer', matricule: 'DES009' },
    { name: 'Oussama Jlassi', position: 'Tester', matricule: 'TES010' },
    { name: 'Amani Fekih', position: 'Developer', matricule: 'DEV011' },
    { name: 'Nadia Boussida', position: 'Manager', matricule: 'MAN012' },
    { name: 'Yassine Hamdi', position: 'Analyst', matricule: 'ANA013' },
    { name: 'Nesrine Zarrouk', position: 'Designer', matricule: 'DES014' },
    { name: 'Khalil Amri', position: 'Tester', matricule: 'TES015' },
    { name: 'Hiba Rejeb', position: 'Developer', matricule: 'DEV016' },
    { name: 'Hatem Gueddiche', position: 'Manager', matricule: 'MAN017' },
    { name: 'Ines Fathallah', position: 'Analyst', matricule: 'ANA018' },
    { name: 'Mouna Charfi', position: 'Designer', matricule: 'DES019' },
    { name: 'Anis Belaid', position: 'Tester', matricule: 'TES020' }
];


  sortColumn: string = 'name';
  sortDirection: boolean = true;

  sortTable(column: string) {
    // Toggle sort direction if the same column is clicked; otherwise, default to ascending
    this.sortDirection = (this.sortColumn === column) ? !this.sortDirection : true;
    this.sortColumn = column;

    // Sort the items based on the column and direction
    this.filteredItems.sort((a, b) => {
        let comparison = 0;

        // Handle sorting based on the selected column
        switch (this.sortColumn) {
            case 'name':
                comparison = a.name.localeCompare(b.name);
                break;
            case 'position':
                comparison = a.position.localeCompare(b.position);
                break;
            case 'matricule':
                comparison = a.matricule.localeCompare(b.matricule);
                break;
        }

        // Return the comparison based on the sort direction
        return this.sortDirection ? comparison : -comparison;
    });
  }

  filteredItems = [...this.items];
  searchQuery: string = '';

  onSearch() {
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
