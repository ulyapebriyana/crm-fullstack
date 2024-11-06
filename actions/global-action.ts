import { S3 } from "@/lib/s3-client"
import { DeleteObjectCommand, DeleteObjectCommandOutput, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import moment from "moment"

interface UploadResponse {
  url: string;
  name: string;
}

export const uploadImage = async (image: FormDataEntryValue): Promise<UploadResponse> => {
  const key = `${crypto.randomUUID()}-${moment().format('YYYY-MM-DD')}`
  const bucket = process.env.CLOUDFLARE_R2_BUCKET
  try {
    const url = await getSignedUrl(S3, new PutObjectCommand({ Bucket: bucket, Key: key }))
    const response = await fetch(url, {
      method: "PUT",
      body: image,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload image. Status: ${response.status}`);
    }
    return { url: `${process.env.CLOUDFLARE_R2_ACCESS_URL}/${key}`, name: key }
  } catch (error) {
    console.log(error);
    throw Error('Internal server error')
  }
}

export const deleteImage = async (key: string): Promise<DeleteObjectCommandOutput> => {
  const input = { // DeleteObjectRequest
    Bucket: process.env.CLOUDFLARE_R2_BUCKET as string, // required
    Key: key, // required
  };
  try {
    const command = new DeleteObjectCommand(input)
    const response = await S3.send(command)
    return response
  } catch (error) {
    console.log(error);
    throw Error('Internal server error')
  }
}