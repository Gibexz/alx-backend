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

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            discarded_key = next(iter(self.cache_data))
            del self.cache_data[discarded_key]
            print(f"DISCARD: {discarded_key}")

    def get(self, key):
        """
        FIFO get method
        """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
