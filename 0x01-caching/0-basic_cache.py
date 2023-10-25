#!/usr/bin/env python3
"""
module: 0-basic_cache.py
"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
    Basic dictionary cache system
    """
    def put(self, key, item):
        """
        method: a put method
        """
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """
        method: a get method
        """
        if key is not None and key in self.cache_data:
            return self.cache_data[key]
        return None
