class ItemService {
  constructor() {
    this.items = Array.from({ length: 1000000 }, (_, i) => ({
      id: i + 1,
      value: i + 1,
    }));

    this.currentOrder = [];

    this.selectedItems = new Set();
  }

  async getItems(page = 1, search = "", limit = 20) {
    page = parseInt(page);
    limit = parseInt(limit);

    let filteredItems = search
      ? this.items.filter((item) => item.value.toString().includes(search))
      : [...this.items];

    const total = filteredItems.length;
    const totalPages = Math.ceil(total / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    let paginatedItems = filteredItems.slice(startIndex, endIndex);

    if (this.currentOrder.length > 0) {
      const orderMap = new Map(
        this.currentOrder.map((id, index) => [id, index])
      );
      paginatedItems.sort((a, b) => {
        const orderA = orderMap.has(a.id) ? orderMap.get(a.id) : Infinity;
        const orderB = orderMap.has(b.id) ? orderMap.get(b.id) : Infinity;
        return orderA - orderB;
      });
    }

    return {
      items: paginatedItems,
      total,
      page,
      totalPages,
    };
  }

  async saveOrder(order) {
    if (!Array.isArray(order)) {
      throw new Error("Order must be an array of item IDs");
    }

    // Проверяем, что все ID существуют
    const validIds = order.every((id) =>
      this.items.some((item) => item.id === id)
    );
    if (!validIds) {
      throw new Error("Invalid item IDs in order array");
    }

    this.currentOrder = order;
    return {
      order: this.currentOrder,
      selected: Array.from(this.selectedItems),
    };
  }

  async saveSelected(selected) {
    if (!Array.isArray(selected)) {
      throw new Error("Selected must be an array of item IDs");
    }

    const validIds = selected.every((id) =>
      this.items.some((item) => item.id === id)
    );
    if (!validIds) {
      throw new Error("Invalid item IDs in selected array");
    }

    this.selectedItems = new Set(selected);
    return {
      order: this.currentOrder,
      selected: Array.from(this.selectedItems),
    };
  }

  async getState() {
    return {
      order: [...this.currentOrder],
      selected: Array.from(this.selectedItems),
    };
  }
}

module.exports = ItemService;
