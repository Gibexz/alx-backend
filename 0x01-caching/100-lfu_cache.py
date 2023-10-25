#!/usr/bin/env python3
"""
module: 100-lfu_cache.py
"""
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """
    LFU policiy caching method
    """
    def __init__(self):
        """
        init command
        """
        super().__init__()
        self.lfu_key_count = {}

    def put(self, key, item):
        """
        LFU put method
        """
        if key is not None and item is not None:
            if key in self.cache_data.keys():
                self.cache_data[key] = item
                self.lfu_key_count[key] += 1
                return

            elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                dis_key = min(self.lfu_key_count, key=self.lfu_key_count.get)
                del self.cache_data[dis_key]
                del self.lfu_key_count[dis_key]
                print(f"DISCARD: {dis_key}")

            self.cache_data[key] = item
            """update the lru key tracking dictionary"""
            self.lfu_key_count[key] = 0

    def get(self, key):
        """
        LFU get method
        """
        if key is None or key not in self.cache_data:
            return None

        """When key is accessed, its value (count) is increamented
        by 1"""
        if key in self.lfu_key_count.keys():
            self.lfu_key_count[key] += 1
        return self.cache_data[key]
