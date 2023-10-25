#!/usr/bin/env python3
"""
module: 1-fifo_cache.py
"""
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """
    FIFO policiy caching method
    """
    def __init__(self):
        """
        init command
        """
        super().__init__()

    def put(self, key, item):
        """
        FIFO put method
        """
        if key is None or item is None:
            pass

        self.cache_data[key] = item

        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            print(f"Discard: {list(self.cache_data.keys())[0]}")
            discard = list(self.cache_data.keys())[0]
            self.cache_data.pop(discard)

    def get(self, key):
        """
        FIFO get method
        """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
