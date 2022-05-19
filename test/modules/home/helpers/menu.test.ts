import { describe, it, expect } from 'vitest';
import { menuItems } from '../../../../src/modules/home/helpers/menu';

describe('Menu Test', () => {
    it('Test', () => {
        expect(menuItems).toHaveLength(6);
        
    });
});
