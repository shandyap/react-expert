// src/setupTests.js
import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend expect Vitest dengan matcher jest-dom
expect.extend(matchers);
