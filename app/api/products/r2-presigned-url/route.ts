
import { createApiResponse } from '@/helpers/response-data'
import { S3 } from '@/lib/s3-client'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { NextResponse, type NextRequest } from 'next/server'
import moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: NextRequest) {
  try {
    const key = `${crypto.randomUUID()}-${moment().format('YYYY-MM-DD')}`

    // The bucket name
    const bucket = process.env.CLOUDFLARE_R2_BUCKET

    // Generate a pre-signed URL for uploading the file
    const url = await getSignedUrl(S3, new PutObjectCommand({ Bucket: bucket, Key: key }))

    const imageUrl = `${process.env.CLOUDFLARE_R2_ACCESS_URL}/${key}`


    return NextResponse.json(createApiResponse(false, 'Ok', { url, imageUrl }), { status: 200 })
  } catch (error) {
    console.log(error);
    return NextResponse.json(createApiResponse(false, 'Internal server error', {}), { status: 500 })
  }

}