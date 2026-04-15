import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  cases: string[] = [];
  newCase: string = '';
  message = '';

  editIndex: number | null = null;
  editText: string = '';

  searchText: string = '';

  // ✅ Load data when app starts
  ngOnInit() {
    const data = localStorage.getItem('cases');
    if (data) {
      this.cases = JSON.parse(data);
    }
  }

  // ✅ Save data helper
  saveToStorage() {
    localStorage.setItem('cases', JSON.stringify(this.cases));
  }

  addCase() {
    if (this.newCase.trim() === '') {
      this.message = 'Please enter a case name!';
      return;
    }

    this.cases.push(this.newCase);
    this.saveToStorage();   // ✅ SAVE
    this.message = this.newCase + ' added successfully!';
    this.newCase = '';
  }

  deleteCase(index: number) {
    const removed = this.cases[index];
    this.cases.splice(index, 1);
    this.saveToStorage();   // ✅ SAVE
    this.message = removed + ' deleted successfully!';
  }

  startEdit(index: number) {
    this.editIndex = index;
    this.editText = this.cases[index];
  }

  saveEdit(index: number) {
    this.cases[index] = this.editText;
    this.saveToStorage();   // ✅ SAVE
    this.message = 'Case updated successfully!';
    this.editIndex = null;
    this.editText = '';
  }

  cancelEdit() {
    this.editIndex = null;
    this.editText = '';
  }

  filteredCases() {
    return this.cases.filter(c =>
      c.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}