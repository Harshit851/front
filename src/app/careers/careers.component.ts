import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-careers',
  imports: [FormsModule, CommonModule],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss'
})
export class CareersComponent {
  introVisible = false;
  cultureVisible = false;
  positionsVisible = false;
  benefitsVisible = false;
  processVisible = false;
  contactVisible = false;
  showForm = false;
  selectedJobTitle = '';
  resumeFile: File | null = null;
  submitMessage = '';

  @ViewChild('applyForm') applyForm!: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.introVisible = this.isSectionInView('careers-intro', 'id');
    this.cultureVisible = this.isSectionInView('careers-culture', 'id');
    this.positionsVisible = this.isSectionInView('careers-positions', 'id');
    this.benefitsVisible = this.isSectionInView('careers-benefits', 'id');
    this.processVisible = this.isSectionInView('careers-process', 'id');
    this.contactVisible = this.isSectionInView('careers-contact', 'id');
  }

  isSectionInView(sectionId: string, selectorType: 'id' | 'class' = 'id'): boolean {
    const selector = selectorType === 'id' ? `#${sectionId}` : `.${sectionId}`;
    const el = document.querySelector(selector);
    if (!el) {
      console.warn(`Section not found: ${selector}`);
      return false;
    }
    const rect = (el as HTMLElement).getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const isVisible = rect.top <= windowHeight - 100;
    console.log(`${sectionId} rect.top: ${rect.top}, windowHeight: ${windowHeight}, visible: ${isVisible}`);
    return isVisible;
  }

  ngOnInit() {
    console.log('CareersComponent initialized');
    setTimeout(() => this.onWindowScroll(), 0);
  }

  showApplyForm(jobTitle: string, event: MouseEvent) {
    event.preventDefault();
    this.selectedJobTitle = jobTitle;
    this.showForm = true;
    setTimeout(() => this.contactVisible = true, 100);
    const contactSection = document.querySelector('#careers-contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onFileChange(event: any) {
    this.resumeFile = event.target.files[0];
  }

  onSubmit(form: any) {
    if (form.valid && this.resumeFile) {
      console.log('Form submitted:', {
        name: form.value.name,
        email: form.value.email,
        jobTitle: this.selectedJobTitle,
        resume: this.resumeFile,
        message: form.value.message
      });
      this.submitMessage = 'Application submitted successfully! We will contact you soon.';
      form.reset();
      this.resumeFile = null;
      this.showForm = false;
      setTimeout(() => this.submitMessage = '', 5000);
    } else {
      this.submitMessage = 'Please fill all fields and upload a resume.';
      setTimeout(() => this.submitMessage = '', 5000);
    }
  }
}