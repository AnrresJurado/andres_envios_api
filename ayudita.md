# Guía de Refactorización Express para el Examen Complexivo (NestJS + TypeORM)

Para cambiar el enfoque de un proyecto manteniendo exactamente la misma lógica de negocio, arquitectura y estructura del código base, el proceso se resume en **Refactorizar**. No tienes que inventar lógica nueva ni cambiar la forma en que NestJS funciona; lo único que haces es reemplazar sistemáticamente los nombres del dominio anterior por los de tu nuevo tema.

Si vas a clonar el repositorio o usar esa misma base de código para el examen, aquí tienes la guía exacta de qué carpetas, archivos y líneas debes modificar para que todo compile y funcione a la primera:

---

## 1. El Mapeo Mental (Tabla de Equivalencias)

Antes de tocar una sola línea de código, debes tener clarísimo qué entidad reemplaza a cuál. Tu mapa de cambios estructurales es:

* **`Category` o `Plan`** $\rightarrow$ Pasa a ser la **Entidad Independiente** (ej. `Brand`).
* **`Post` o `Socio`** $\rightarrow$ Pasa a ser la **Entidad Dependiente** (ej. `Motorcycle` que lleva la FK).
* **`User` / `Auth`** $\rightarrow$ Se quedan **exactamente igual** (usuarios, roles, contraseñas y logins no cambian por el tema del negocio).

---

## 2. Nombres de Archivos y Carpetas (La Infraestructura)

Debes renombrar las carpetas dentro de `src/` para reflejar el nuevo negocio.

* Cambia la carpeta `src/categories/` a `src/brands/`.
* Cambia la carpeta `src/posts/` a `src/motorcycles/`.

Dentro de cada carpeta, renombra los archivos usando la convención oficial de NestJS (`recurso.tipo.ts`):
* `category.entity.ts` $\rightarrow$ `brand.entity.ts`
* `create-category.dto.ts` $\rightarrow$ `create-brand.dto.ts`
* `posts.controller.ts` $\rightarrow$ `motorcycles.controller.ts`

> 💡 **Tip en Windows/Ubuntu:** Selecciona el archivo o carpeta y presiona **`F2`** para cambiar el nombre rápidamente sin usar el mouse.

---

## 3. Modificaciones Clave Dentro del Código

Al abrir los archivos, debes cambiar cuatro cosas fundamentales para que TypeScript y NestJS compilen correctamente:

### A. Los Nombres de las Clases e Inyecciones
Debes cambiar los nombres de las clases respetando rigurosamente el uso de mayúsculas (**CamelCase**):
* Donde decía `class PostsService`, ahora debe decir `class MotorcyclesService`.
* Donde se inyectaba el repositorio `@InjectRepository(Post)`, ahora debe ser `@InjectRepository(Motorcycle)`.

### B. El Nombre de las Tablas en las Entidades (`@Entity`)
Este cambio impacta directamente en PostgreSQL. Si no lo cambias, TypeORM intentará buscar o crear las tablas con los nombres del proyecto viejo.
* En tu archivo de marca/plan, el decorador debe cambiar de `@Entity('categories')` a `@Entity('brands')`.
* En tu archivo de motos/socios, debe cambiar de `@Entity('posts')` a `@Entity('motorcycles')`.

### C. Las Rutas de los Controladores (`@Controller`)
Esto es lo que define tus nuevas direcciones y endpoints en Postman:
* Cambia `@Controller('posts')` por `@Controller('motorcycles')`. De esta forma el endpoint deja de responder en `/posts` y pasa a escuchar en `/motorcycles`.

### D. Las Propiedades de los DTOs y Atributos
Adapta los campos internos del JSON al nuevo contexto del enunciado:
* En lugar de validar campos como `title` o `content`, tus DTOs ahora validarán `model`, `price` y `year`.
* La clave foránea que antes se llamaba `categoryId` o `planId` en el DTO de creación, ahora la renombras a `brandId`.

---

## 4. Las Importaciones (`import { ... } from '...'`)

Este es el error que más hace perder la cabeza en el examen (archivos con líneas en rojo). Cuando cambias de nombre un archivo o lo mueves de carpeta, todas las líneas `import` que apunten a él se van a romper.

Si cambiaste `Post` por `Motorcycle`, debes ir a `app.module.ts` (y a los módulos correspondientes) y corregir la ruta de importación manual:

```typescript
// ANTES
import { PostsModule } from './posts/posts.module';

// AHORA
import { MotorcyclesModule } from './motorcycles/motorcycles.module';