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
        if key or item is None:
            pass
        self.cache_data[key] = item

    def get(self, key):
        """
        method: a get method
        """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data.get(key, None)
