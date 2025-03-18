import app from "../server";
import request from "supertest";
import Author from "../models/author";

describe("Verify GET /authors", () => {
    const mockAuthors = [
        { name: "Doe, John", lifespan: "1990 - 2020" },
        { name: "Smith, Jane", lifespan: "1985 - 2015" },
        { name: "Williams, Robert", lifespan: "1980 - 2025" }
    ];

    let consoleSpy: jest.SpyInstance;

    beforeAll(() => {
        consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterAll(() => {
        consoleSpy.mockRestore();
    });

    it("should respond with 200 status and a sorted list of authors by family name", async () => {
        Author.getAllAuthors = jest.fn().mockResolvedValue(mockAuthors);
        
        const response = await request(app).get("/authors");
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual(mockAuthors.sort((a, b) => a.name.localeCompare(b.name)));
    });

    it("should respond with 404 status and 'No authors found' message when database is empty", async () => {
        Author.getAllAuthors = jest.fn().mockResolvedValue([]);
        
        const response = await request(app).get("/authors");
        
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("No authors found");
    });

    it("should respond with 500 status and error message when an error occurs", async () => {
        Author.getAllAuthors = jest.fn().mockRejectedValue(new Error("Database error"));
        
        const response = await request(app).get("/authors");
        
        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe("Error fetching authors");
        expect(consoleSpy).toHaveBeenCalled();
    });
});
