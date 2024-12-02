/// <reference path="../.astro/types.d.ts" />

/// <reference types="astro/client" />

interface User {
    id: number;
    email: string;
    name: string;
    role: string;
  }
  
  declare namespace App {
    interface Locals {
      user?: User;
    }
  }