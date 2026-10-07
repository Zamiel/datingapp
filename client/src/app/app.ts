import {Component, DestroyRef, DOCUMENT, Inject, OnInit, Renderer2, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [
    NgOptimizedImage
  ]
})
export class App implements OnInit {
  protected readonly members = signal<any>(null);
  protected readonly title = signal('Dating App');

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly http: HttpClient,
    private readonly renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit(): void {
    this.http.get("https://localhost:5001/api/members")
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: response => this.members.set(response),
      });

    this.renderer.setAttribute(this.document.documentElement, 'data-theme', 'cupcake');
  }
}
