import path from 'path';
import dotenv from 'dotenv';
import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import { fileURLToPath } from 'url';

dotenv.config();

const SERVER = process.env.SERVER_URL;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '웹 에디터 서비스 프로젝트',
      version: '1.0.0',
      description: '사용자들의 공동 편집을 도와주는 서비스입니다.',
    },
    servers: [
      {
        url: SERVER,
      },
    ],
    components: {
      schemas: {
        LoginRequest: {
          type: 'object',
          properties: {
            nickname: {
              type: 'string',
              description: '사용자 닉네임',
            },
          },
          required: ['nickname'],
        },
        Teamspace: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: '팀 스페이스 ID',
            },
            title: {
              type: 'string',
              description: '팀 스페이스 이름',
            },
            articles: {
              $ref: '#components/schemas/Articles',
            },
          },
        },
        Teamspaces: {
          type: 'array',
          items: {
            $ref: '#components/schemas/Teamspace',
          },
        },
        Article: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: '아티클 ID',
            },
            title: {
              type: 'string',
              description: '아티클 제목',
            },
            icon: {
              type: 'string',
              description: '아티클 아이콘 URL',
            },
            content: {
              $ref: '#/components/schemas/Block',
            },
            updatedAt: {
              type: 'string',
              description: '업데이트 시간',
            },
          },
        },
        Articles: {
          type: 'array',
          items: {
            $ref: '#components/schemas/Article',
          },
        },
        Block: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              description: '블록 태그 타입',
            },
            content: {
              type: 'string',
              description: '블록 내용',
            },
            level: {
              type: 'number',
              description: '헤더 레벨',
            },
            url: {
              type: 'string',
              description: '이미지 URL',
            },
            alt: {
              type: 'string',
              description: '이미지 설명',
            },
            items: {
              $ref: '#/components/schemas/Item',
            },
          },
        },
        Item: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              description: '아이템 타입',
            },
            content: {
              type: 'string',
              description: '아이템 내용',
            },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, '../../dist/routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
