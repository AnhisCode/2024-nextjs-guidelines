<div align="center">
  <h1><b>🚀 The Ultimate FullStack App Guidelines</b></h1>
    <img src='https://dz2cdn1.dzone.com/storage/article-thumb/11707156-thumb.jpg' height="350" width="auto">
  <p>Next.js ^14 + TypeScript + Prisma + Tailwind + NextAuth + Jest</p>
  <p>I've adopted industries best practices into this template from my professional experience working in big techs.</p>
  <p>Made by Anh Dao, built upon the original work of Nam Dao </p>
</div>

# **👉 Quick start**

1. Please set up the [Google OAuth 2.0 API & Credentials by following this tutorial](https://next-auth.js.org/providers/google)

2. Use the following to set up and retrieve google client ID and secret [Google OAuth2 Doc](https://developers.google.com/identity/protocols/oauth2)

3. Make sure you have the `.env` file present with the following variables.
    ```
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    DATABASE_URL=
    ```
4. Create a Railway PostgreSQL instance and copy the connection string. [Railway Docs](https://docs.railway.app/#/docs/databases/postgres)

![image](https://i.imgur.com/PTVJWQU.png)

4. Run `npx prisma migrate dev --name init`. Make sure it is pointed at the local db.

5. Run `npm run dev`.

6. Deploy to Vercel for free 😎

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnamdao2000%2Fultimate-nextjs-starter)

### **💡 Main**
- [x] Authentication using NextAuth with Google Login.
- [x] PostgreSQL and Prisma ORM.
- [x] Protected vs public API procedures using tRPC.
- [x] API schema validation using ZOD validator.
- [x] Testing using jest and jest-mock-extended

### **🧑‍💻 Developer experience**

- [x] Typescript
- [x] Using Uncle Bob's Clean Architecture for backend codebase.
- [x] Create React components faster with component library using Chakra UI.
- [x] Eslint and Prettier for code formatting.
- [x] lint-staged and pretty-quick for running linting on staged files.
- [x] Using nvm (node version manager) so everyone in the team is using the same version of node.

# **📚 Best practices**
Below are some of the best practices used when creating this project.
I've included this section to explain the reasoning behind my decisions.

## **🗂 Architecture**
The structure of the backend code has been inspired by [Uncle Bob's Clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).
But what is Clean Architecture?

![Clean Architecture Diagram](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

> The overriding rule that makes this architecture work is The Dependency Rule.
> This rule says that source code dependencies can only point inwards.
> Nothing in an inner circle can know anything at all about something in an outer circle.

Following this pattern, the code base is organised into the following layers:

### **1. API layer (`src/pages/api/*`)**
This layer is responsible for receiving requests from the client and sending responses back to the client.
Some of its responsibilities are:
- Error handling
- Authentication
- Authorization
- API schema validation

It should not need to know any business logic or data access logic.

### **2. Service layer (`src/libs/services/*`)**
This layer is responsible for business logic. You will do most of the heavy lifting here. 

## **✅ Testing**
Testing is always a controversial topic, especially in the startup world. My experience has taught me that when you're hacking together a project for an MVP or building a PoC, don't even think about it. Why spend all the effort writing test cases (which btw takes a long time) when the code could be torn down at any time. However, if your intension is to write code that **won't be torn down**, please write tests!

### **Why are repository layer and service layer all classes!?**
I've adopoted dependnecy injection for our backend code. Its basiclaly a design pattern where an object receives other objects that it depends on, usually through the constructor. This will allow us to mock dependencies easier later on.

### **How to write unit testing using Jest & Jest Mock Extended**
For example, if you have a file called `productService.ts`, a test file should be called `productService.test.ts`.

`productService.ts`
```ts
export class ProductService {
  constructor(private productDependency: ProductDependency) {}

  async getManyProducts(): Promise<Product[]> {
    ...
  }

  async deleteOneProduct(where: Prisma.ProductWhereInput): Promise<void> {
    ...
  }
}
```


Let's say you want to test that the `ProductService.deleteOneProduct()` 

Your test file will look like this `productService.test.ts`:
```ts
describe('ProductService', () => {
  const productDependencyMock = mock<ProductDependency>();
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService(productDependencyMock);
  });

  describe('deleteOneProduct', () => {
    it('should call ProductRepository.deleteOneProduct', async () => {
      const where = { id: '1', userId: 'anh' };
      await productService.deleteOneProduct(where);
      expect(mockProductRepository.deleteOneProduct).toHaveBeenCalledWith(
        where
      );
    });
  });
});
```

Where:
- The first `describe()` specifies the class name.
- we define all the dependnecies we need to mock using `mock` from `jest-mock-extended`.
- Do any pre testing logic in `beforeEach()`.
- The second `describe()` specifies the method name.
- Test name should follow the format `'should (logic)'`

## **⚙️ CI/CD with GitHub Actions and Vercel**
We're using GitHub Actions to run `npm run build` and `npm test` on commits and PRs to the main branch.

Once a new commit is pushed to the main branch, vercel detects that and rebuilds the application for us.

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
