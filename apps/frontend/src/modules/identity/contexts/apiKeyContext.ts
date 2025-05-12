import { VueContext } from '#infrastructure/VueContext';
import type { ApiKeyService } from '../services/ApiKeyService';

export const apiKeyContext = new VueContext<ApiKeyService>(Symbol('apiKey'));
