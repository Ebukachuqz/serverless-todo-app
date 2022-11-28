import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic
const urlExpiration = process.env.SIGNED_URL_EXPIRATION
const s3Bucketname = process.env.ATTACHMENTS_S3_BUCKET

export class AttachmentUtils {
  constructor(
    private readonly s3 = new XAWS.S3({ signatureVersion: 'v4' }),
    private readonly bucketName = s3Bucketname
  ) {}

  getAttachmentUrl(todoId: string) {
    return `https://${this.bucketName}.s3.amazonaws.com/${todoId}`
  }

  getUploadUrl(todoId: string) {
    const uploadUrl = this.s3.getSignedUrl('putObject', {
      Bucket: this.bucketName,
      Key: todoId,
      Expires: urlExpiration
    })
    return uploadUrl as string
  }
}