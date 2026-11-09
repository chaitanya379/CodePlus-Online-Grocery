package CodePlus.controller;

import CodePlus.entity.GroceryItem;
import CodePlus.repository.GroceryItemRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/groceries")
@CrossOrigin(origins = "*")
public class GroceryItemController {

    private final GroceryItemRepository repository;

    public GroceryItemController(GroceryItemRepository repository) {
        this.repository = repository;
    }

    // Get all grocery items
    @GetMapping
    public List<GroceryItem> getAllItems() {
        return repository.findAll();
    }

    // Add a grocery item
    @PostMapping
    public GroceryItem addItem(@RequestBody GroceryItem item) {
        return repository.save(item);
    }

    // Delete a grocery item
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        repository.deleteById(id);
    }
}