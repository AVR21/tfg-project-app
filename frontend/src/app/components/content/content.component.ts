// src/app/content/content.component.ts
import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content/content.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-content',
  imports: [ReactiveFormsModule],
  templateUrl: './content.component.html',
})
export class ContentComponent implements OnInit {
  contents: any[] = [];
  contentForm: FormGroup;

  constructor(private contentService: ContentService, private fb: FormBuilder, private authService: AuthService) {
    this.contentForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  defaultBody(body: string): any[] {
  return [
    {
      type: 'paragraph',
      children: [{ text: body, type: 'text' }]
    }
  ];
}

  ngOnInit(): void {
    this.loadContents();
  }

  loadContents() {
    this.contentService.getContents().subscribe((res) => {
      this.contents = res.data;
      console.log(this.contents);
    });
  }

  onSubmit() {
    const userId = localStorage.getItem('userId');
    const newContent = {
      data: {
        title: this.contentForm.value.title, 
        body: this.defaultBody(this.contentForm.value.body),
        id: 2
      },
    };

    this.contentService.createContent(newContent).subscribe(() => {
      this.contentForm.reset();
      this.loadContents(); // Refresh list
    });
  }
}
