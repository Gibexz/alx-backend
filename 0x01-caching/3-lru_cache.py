#!/usr/bin/env python3
"""
module: 3-lru_cache.py
"""
from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """
    LRU policiy caching method
    """
    def __init__(self):
        """
        init command
        """
        super().__init__()
        self.lruKeys = []

    def put(self, key, item):
        """
        LRU put method
        """
        if key is not None and item is not None:
            if key in self.cache_data.keys():
                self.cache_data[key] = item
                return

            elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                discarded_key = self.lruKeys.pop(0)
                del self.cache_data[discarded_key]
                print(f"DISCARD: {discarded_key}")

            self.cache_data[key] = item
            """update the lru key tracking list"""
            self.lruKeys.append(key)

    def get(self, key):
        """
        LRU get method
        """
        if key is None or key not in self.cache_data:
            return None

        """When key is accessed, it is saved to the end of the list
        as most recent"""
        self.lruKeys.remove(key)
        self.lruKeys.append(key)
        return self.cache_data[key]
