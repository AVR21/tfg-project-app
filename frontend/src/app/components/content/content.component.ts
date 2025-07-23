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
    //this.loadContents();
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
      this.loadContents();
    });
  }

  async seedGames({total = 1000000, batchSize = 10000, delayMs = 1000} = {}) {
  const token = this.authService.getToken();

  for (let i = 0; i < total; i += batchSize) {
    const currentBatch = Array.from({ length: batchSize }, (_, j) => i + j)
      .filter(index => index < total)
      .map(index => {
        return fetch(`http://${window.location.hostname}:1337/api/games`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            data: {
              title: `Juego ${index}`,
              body: `Descripción del juego ${index}`,
              score: Math.floor(Math.random() * 10)
            }
          })
        }).then(async res => {
          if (!res.ok) {
            const errorText = await res.text();
            console.error(`Error creando juego ${index}:`, errorText);
          } else {
            console.log(`Juego ${index} creado correctamente`);
          }
        }).catch(err => {
          console.error(`Fallo en fetch para juego ${index}:`, err.message);
        });
      });

    await Promise.all(currentBatch);
    console.log(`Esperando ${delayMs} ms antes del siguiente lote...`);
    await new Promise(r => setTimeout(r, delayMs));
  }

  console.log('Seeding completado.');
}

async seedCompanies({total = 500, batchSize = 10, delayMs = 1000} = {}) {
  const token = this.authService.getToken();

  for (let i = 0; i < total; i += batchSize) {
    const currentBatch = Array.from({ length: batchSize }, (_, j) => i + j)
      .filter(index => index < total)
      .map(index => {
        return fetch(`http://${window.location.hostname}:1337/api/companies`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            data: {
              name: `Company - ${index}`
            }
          })
        }).then(async res => {
          if (!res.ok) {
            const errorText = await res.text();
            console.error(`Error creando compañía ${index}:`, errorText);
          } else {
            console.log(`Compañía ${index} creado correctamente`);
          }
        }).catch(err => {
          console.error(`Fallo en fetch para compañía ${index}:`, err.message);
        });
      });

    await Promise.all(currentBatch);
    console.log(`Esperando ${delayMs} ms antes del siguiente lote...`);
    await new Promise(r => setTimeout(r, delayMs));
  }

  console.log('Seeding completado.');
}

}
