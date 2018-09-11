import { NgModule } from '@angular/core';
import {
    MatToolbarModule, 
    MatButtonModule, 
    MatInputModule, 
    MatIconModule, 
    MatCardModule, 
    MatTableModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule
} from '@angular/material';


@NgModule({
    imports: [
        MatToolbarModule, 
        MatButtonModule, 
        MatInputModule, 
        MatIconModule,
        MatCardModule, 
        MatTableModule,
        MatMenuModule,
        MatSelectModule,
        MatDialogModule
        
    ],
    exports: [
        MatToolbarModule, 
        MatButtonModule, 
        MatInputModule, 
        MatIconModule, 
        MatCardModule, 
        MatTableModule,
        MatMenuModule,
        MatSelectModule,
        MatDialogModule
        
    ]
})

export class MaterialModule { }