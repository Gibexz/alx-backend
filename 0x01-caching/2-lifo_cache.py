#!/usr/bin/env python3
"""
module: 2-lifo_cache.py
"""
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """
    LIFO policiy caching method
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
        if key in self.cache_data.keys():
            del self.cache_data[key]
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                discarded_key = next(reversed(list(self.cache_data.keys())))
                del self.cache_data[discarded_key]
                print(f"DISCARD: {discarded_key}")

            self.cache_data[key] = item

    def get(self, key):
        """
        FIFO get method
        """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
