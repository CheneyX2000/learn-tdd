# JEST tutorial for test-driven development

Learn how to write unit tests and other kinds of tests

# Setup

Install dependencies

`$ npm install`

Run tests

`$ NODE_ENV=test npx jest /path/to/test/file`

Run coverage

`$ NODE_ENV=test npx jest --coverage /path/to/test/file`

View coverage report in `coverage/lcov-report/index.html`

The followung database scripts are not necessary. If you still need
them for manual testing here they are:

`$ npx ts-node insert_sample_data.ts "mongodb://127.0.0.1:27017/my_library_db"`

Clean the database

`npx ts-node remove_db.ts "mongodb://127.0.0.1:27017/my_library_db"`

# Description

This repository illustrates how to use jest to write unit tests
for a server in typescript. The examples are as follows:

- `tests/authorSchema.test.ts`: Unit tests to verify the schema of the authors colletion.
- `tests/bookDetailsService.test.ts`: Unit tests to verify the behavior of the service that is used to retrieve the details of a particular book.
- `tests/createBookService.test.ts`: Unit tests to verify if a book is created successfully.

# For you to do

## Part 1

Write a unit test for the GET /authors service.
The service should respond with a list of author names and lifetimes sorted by family name of the authors. It should respond
with a "No authors found" message when there are no authors in the database. If an error occurs when retrieving the authors then the
service responds with an error code of 500. The unit test should be placed in `tests/authorService.test.ts`.

## Part 2

Briefly explain a limitation of the tests in `tests/authorSchema.test.ts` in the space below.

Limitations:
The tests assume that first_name, family_name, and date_of_birth are correctly formatted. However, they do not check how the schema handles:
Invalid data types (e.g., numbers instead of strings for names).
Malformed dates (e.g., a birth date in the future).
Empty inputs that might violate schema validation rules.

## Part 3

Generate the coverage report for the tests you wrote.
How can you improve your tests using the coverage report? Briefly explain your process in the space below.

Coverage Report:
------------------|---------|----------|---------|---------|--------------------------------
File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------|---------|----------|---------|---------|--------------------------------
All files | 47.34 | 5.71 | 5.88 | 48.74 |  
 learn-tdd | 67.85 | 0 | 0 | 67.85 |  
 server.ts | 67.85 | 0 | 0 | 67.85 | 25-37  
 learn-tdd/models | 38.09 | 0 | 0 | 38.55 |  
 author.ts | 27.27 | 0 | 0 | 28.12 | 56-63,74-82,92,102-109,119-123
book.ts | 40 | 0 | 0 | 40 | 72,83-88,97,110-120  
 bookinstance.ts | 46.66 | 0 | 0 | 46.66 | 50-53,63-70,80  
 genre.ts | 54.54 | 0 | 0 | 54.54 | 39,48-52  
 learn-tdd/pages | 49.47 | 22.22 | 12.5 | 52.27 |  
 authors.ts | 100 | 100 | 100 | 100 |  
 book_details.ts | 37.5 | 0 | 0 | 40 | 17-36  
 books.ts | 36.84 | 100 | 0 | 41.17 | 9-16,25-29  
 books_status.ts | 50 | 100 | 0 | 55.55 | 13-18  
 create_book.ts | 47.05 | 0 | 0 | 50 | 22-32  
 home.ts | 40 | 100 | 0 | 42.1 | 15-30,39-44  
------------------|---------|----------|---------|---------|--------------------------------
Test Suites: 1 passed, 1 total
Tests: 3 passed, 3 total
Snapshots: 0 total
Time: 1.227 s, estimated 3 s

The coverage report shows that authorService.test.ts has low test coverage (47.34% statements, 5.71% branches, 5.88% functions, and 48.74% lines).
The report shows that some lines in server.ts, author.ts, book.ts, bookinstance.ts, and genre.ts are not tested.

My process is to expand authorService.test.ts to:
Simulate edge cases (e.g., database failure, malformed inputs).
Verify different conditional branches (e.g., if Author.getAllAuthors returns null or unexpected data).
Mock more behaviors to ensure proper Jest mocking for database calls.

Aside from expending the authorService, also write unit tests for models (author.ts, book.ts, etc.) to:
Validate schema constraints (e.g., required fields, default values).
Test instance methods (e.g., how names are formatted in Author).
Ensure query functions work as expected.
