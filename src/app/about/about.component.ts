import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  heroVisible = false;
  storyVisible = false;
  teamVisible = false;
  valuesVisible = false;
  testimonialsVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.heroVisible = this.isSectionInView('about-hero', 'id');
    this.storyVisible = this.isSectionInView('about-story', 'id');
    this.teamVisible = this.isSectionInView('about-team', 'id');
    this.valuesVisible = this.isSectionInView('about-values', 'id');
    this.testimonialsVisible = this.isSectionInView('about-testimonials', 'id');
  }

  isSectionInView(sectionId: string, selectorType: 'id' | 'class' = 'id'): boolean {
    const selector = selectorType === 'id' ? `#${sectionId}` : `.${sectionId}`;
    const el = document.querySelector(selector);
    if (!el) {
      console.log(`Section not found: ${selector}`);
      return false;
    }
    const rect = (el as HTMLElement).getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const isVisible = rect.top < windowHeight - 100;
    console.log(`${sectionId} visible: ${isVisible}`);
    return isVisible;
  }

  ngOnInit() {
    this.onWindowScroll();
  }
}