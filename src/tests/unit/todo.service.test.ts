import { describe , expect, it , vi} from "vitest"; 
import * as service from "../../services/todo.service.js";
import * as repository from "../../repositories/todo.repository.js";
// Only tests the methods in the service layer.

vi.mock("../../repositories/todo.repository.js");


describe ("Todo list Service testing",  ()=>{
    it("should throw error when title is empty", async ()=>{
        await expect(service.createTodo("")).rejects.toThrow("title should not be empty");

    });

    it("should create todo",  async()=>{
        vi.mocked(repository.insert).mockResolvedValue({
            id : 1,
            title : "Clean Room",
            completed : false
        });
        const result = await service.createTodo("Clean Room");
        expect ( result.title ).toBe("Clean Room");
    })
    // This will not work because i have hnadled in the middleware and not the service layer itself
    /* it ("should throw error when title is missing", async ()=> {
        await expect( service.createTodo(undefined as any)).rejects.toThrow("title should not be empty");
    }); */

    it ("should return error when fields are missing", async()=>{
        const result = await service.updateTodo(1,undefined as any, true);

        expect(result).toEqual({error : "MISSING_FIELD"});

    });

    it ("should return error if todo does not exist", async()=>{
        vi.mocked(repository.findById).mockResolvedValue(null);

        const result = await service.updateTodo(1,"Clean Room",true);
        expect(result).toBeNull();

    });

    it ("should update todo successfully", async()=>{
        vi.mocked(repository.findById).mockResolvedValue({
            id : 1,
            title : "old title",
            completed : false
        });

        vi.mocked(repository.update).mockResolvedValue({
            id : 1,
            title : "new title",
            completed : true
        });

        const result = await service.updateTodo(1,"new title", true);
        expect ( result ).toEqual ({
            id : 1, 
            title : "new title", 
            completed : true
        });
    })
});                                        